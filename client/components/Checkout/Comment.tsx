import { ChangeEvent } from 'react';
import useTranslations from '../../hooks/useTranslations';
import { IOrder } from '../../types/order';
import Label from '../Form/Label';

interface ICommentProps {
    formValues: IOrder;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, object: any, type?: string) => void;
}

const Comment = ({ formValues, handleChange }: ICommentProps) => {
    const t = useTranslations();

    return (
        <div>
            <Label text={t.additionalInformation} />
            <div className="relative">
                <textarea
                    className="w-full resize-none h-52 p-3 border-2 border-neutral-400 rounded-lg focus:outline-none focus:border-vp_brown-200 text-sm md:text-md "
                    placeholder={t.leaveComment}
                    name="comment"
                    value={formValues.comment}
                    maxLength={200}
                    onChange={(e) => handleChange(e, formValues)}
                />
                <p className="absolute right-3 bottom-3 text-xs text-vp_gray">{formValues.comment?.length}/200</p>
            </div>
        </div>
    );
};

export default Comment;
